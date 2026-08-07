import { useState, useCallback, useEffect, useRef } from 'react'

export default function ImageViewer({ src, alt, isOpen, onClose }) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // Refs for tracking drag and pinch touch interactions
  const dragStartRef = useRef({ x: 0, y: 0 })
  const pinchStartDistRef = useRef(null)
  const initialZoomRef = useRef(1)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleWheel = useCallback((e) => {
    if (!isOpen) return
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    setZoom((prev) => {
      const nextZoom = Math.min(Math.max(1, prev + delta), 4)
      if (nextZoom === 1) setPosition({ x: 0, y: 0 })
      return nextZoom
    })
  }, [isOpen])

  // --- Mouse Handlers ---
  const handleMouseDown = (e) => {
    if (zoom <= 1) return
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // --- Touch Handlers (Mobile) ---
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.hypot(dx, dy)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true)
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      }
    } else if (e.touches.length === 2) {
      setIsDragging(false)
      pinchStartDistRef.current = getTouchDistance(e.touches)
      initialZoomRef.current = zoom
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging && zoom > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      })
    } else if (e.touches.length === 2 && pinchStartDistRef.current) {
      const currentDist = getTouchDistance(e.touches)
      const scale = currentDist / pinchStartDistRef.current
      const nextZoom = Math.min(Math.max(1, initialZoomRef.current * scale), 4)
      setZoom(nextZoom)
      if (nextZoom === 1) {
        setPosition({ x: 0, y: 0 })
      }
    }
  }

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsDragging(false)
      pinchStartDistRef.current = null
    } else if (e.touches.length === 1 && zoom > 1) {
      pinchStartDistRef.current = null
      setIsDragging(true)
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      }
    }
  }

  const handleZoomChange = (delta) => {
    setZoom((prev) => {
      const nextZoom = Math.min(Math.max(1, prev + delta), 4)
      if (nextZoom === 1) setPosition({ x: 0, y: 0 })
      return nextZoom
    })
  }

  if (!isOpen) return null

  return (
    <div 
      className="image-viewer-overlay" 
      onClick={onClose}
      onWheel={handleWheel}
    >
      <div className="image-viewer-controls" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => handleZoomChange(0.5)} aria-label="Aumentar zoom">
          <i className="fas fa-search-plus"></i>
        </button>
        <button onClick={() => handleZoomChange(-0.5)} aria-label="Disminuir zoom">
          <i className="fas fa-search-minus"></i>
        </button>
        <button onClick={onClose} aria-label="Cerrar">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div 
        className="image-viewer-container"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          touchAction: 'none'
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          draggable="false"
        />
      </div>
      
      <div className="image-viewer-hint">
        {zoom > 1
          ? 'Arrastra para mover • Usa los botones o pellizca para zoom'
          : 'Usa los botones, la rueda o pellizca para zoom'}
      </div>
    </div>
  )
}
