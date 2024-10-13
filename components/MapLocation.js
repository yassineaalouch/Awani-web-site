function MapLocation({url}) {
  return (
    <div>
        <iframe src={url}
        width="600"
        height={"300"} 
        className="w-full"    
        loading="lazy" 
        allowFullScreen="no-referrer-when-downgrade">
    </iframe>
    </div>
  )
}

export default MapLocation
