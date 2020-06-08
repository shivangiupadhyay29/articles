import React from 'react';
import PropTypes from 'prop-types';

function Footer({headerTitle, footerText}){
    return (
        <footer>  
                <div className="container">
                <a href="/" className="logo">{headerTitle}</a>  
                <span className="text">{footerText}</span>         
                </div>
       </footer>
    )
}

Footer.propTypes = {
    headerTitle: PropTypes.string.isRequired,
    footerText: PropTypes.string.isRequired
}

Footer.defaultProps = {
  headerTitle:'conduit',
  footerText:'© 2020. An interactive learning project from Thinkster. Code licensed under MIT.'
}

export default Footer;
