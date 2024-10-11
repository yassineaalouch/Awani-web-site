function MapLocation({isContactPage}) {
  return (
    <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251.9952181389887!2d-7.483418606436457!3d33.54892934301149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda634dfc387e70d%3A0x9d353339dee9142e!2sGGX8%2BHP9%2C%20Bd%20Bassatine%2C%20Titt%20Mellilen!5e0!3m2!1sen!2sma!4v1728420838452!5m2!1sen!2sma" width="600" height={isContactPage?'635':"300"} className="w-full" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default MapLocation
