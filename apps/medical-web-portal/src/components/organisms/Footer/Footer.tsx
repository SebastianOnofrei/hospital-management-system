import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-column">
    <h4>Resources</h4>
    <ul>
      <li><a href="#">Documentation</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Guides</a></li>
    </ul>
  </div>

  <div className="footer-column">
    <h4>Quick Access</h4>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About Us</a></li>
      <li><a href="#">Services</a></li>
    </ul>
  </div>

  <div className="footer-column">
    <h4>Contact</h4>
    <p>Email: support@med.ro</p>
    <p>Phone: +40 (721) 628 821</p>
    <p>Location: Brașov, Romania</p>
  </div>
</footer>
  )
}

export default Footer
