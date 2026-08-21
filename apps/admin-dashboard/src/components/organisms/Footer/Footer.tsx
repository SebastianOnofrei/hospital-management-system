import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-column">
    <h4>Emergencies</h4>
    <ul>
      <li><a href="#">24/7 Emergency Services</a></li>
      <li><a href="#">Contact Emergency Department</a></li>
      <li><a href="#">Emergency Protocols</a></li>
    </ul>
  </div>

  <div className="footer-column">
    <h4>Payments</h4>
    <ul>
      <li><a href="#">Billing</a></li>
      <li><a href="#">Accounts</a></li>
      <li><a href="#">Support</a></li>
    </ul>
  </div>

  <div className="footer-column">
    <h4>About App</h4>
    <p>Latest news and updates.</p>
    <p>Update app</p>
  </div>
</footer>
  )
}

export default Footer
