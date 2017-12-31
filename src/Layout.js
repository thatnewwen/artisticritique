import React from 'react'
import Header from './Header'

const Layout = ({ children }) => (
  <section>
    <Header />
    {children}
    <div className="footer">
      <span className="footerText">On Sundays, I didn't wind my spring.</span>
    </div>
  </section>
)

export default Layout;