import React from 'react';
import web from './Assets/social-icons-white-dribbble.svg';
import Twitter from './Assets/social-icons-white-twitter.svg';
import insta from './Assets/social-icons-white-instagram.svg';
import youtube from './Assets/social-icons-white-youtube.svg';

function Footer() {
    const SocialIcon = ({ src, alt, href }) => (
        <div className="social-icon">
            <a href={href} target="_blank" rel="noopener noreferrer">
                <img src={src} alt={alt} style={{ width: '100%', maxWidth: '30px' }} />
            </a>
        </div>
    );

    return (
        <>
            {/* First Container */}
            <div style={styles.footerContainer}>
                <div style={styles.footerContent}>
                    <div style={styles.footerColumn}>
                        <div style={styles.footerText}></div>
                        <div style={styles.footerLinks}>
                            {['الرئسيه', 'الدروس'].map((text, index) => (
                                <a
                                    href='/'
                                    key={index}
                                    style={styles.footerLink}
                                >
                                    {text}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div style={styles.footerColumn}>
                        <div style={styles.footerText}></div>
                        <div style={styles.footerLinks}>
                            {['Facebook', 'التواصل', '0100000000000'].map((text, index) => (
                                <div key={index} style={styles.footerLink}>
                                    <a style={{ color: "white" }} href='https://www.facebook.com/AshrafAbed2020'>{text}</a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.footerColumn}>
                        <div style={styles.footerHeader}>
                            أ/ أشرف عابد
                        </div>
                        <div style={styles.footerQuote}>
                            اللهم إنا نسألك علماَ نافعاَ ورزقاَ طيباَ وعملاَ متقبلاَ
                        </div>
                        <div style={styles.footerSocials}>
                            <SocialIcon src={web} alt="Social Icon 1" href="#" />
                            <SocialIcon src={insta} alt="Social Icon 2" href="#" />
                            <SocialIcon src={youtube} alt="Social Icon 3" href="#" />
                            <SocialIcon src={Twitter} alt="Social Icon 4" href="#" />
                        </div>
                    </div>
                </div>
            </div>

       
            <footer style={styles.developerFooter}>
                <div style={styles.developerText}>
                    Developed by <a style={styles.developerLink} href='https://www.linkedin.com/in/youssef-abd0-601b9a2aa/'>Yousef Abdo</a>, <a style={styles.developerLink} href='https://www.linkedin.com/in/mostafa-fayez-082b5321a/'>Mostafa Fayiz</a>. All Copy Rights Reserved © 2024
                </div>
            </footer>
        </>
    );
}

const styles = {
    footerContainer: {
        width: '102%',
        paddingTop: '60px',
        paddingBottom: '60px',
        paddingLeft: '20px',
        paddingRight: '20px',
        background: 'linear-gradient(0deg, #6080BF 0%, #6080BF 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
    },
    footerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        flexWrap: 'wrap',
    },
    footerColumn: {
        width: '100%',
        maxWidth: '296px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    footerText: {
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Lemonada',
        fontWeight: '575',
        lineHeight: '16px',
        marginBottom: '24px',
    },
    footerLinks: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
    },
    footerLink: {
        color: '#F5F6F6',
        fontSize: '16px',
        fontFamily: 'Lemonada',
        fontWeight: '380',
        lineHeight: '16px',
        textAlign: 'center',
        wordWrap: 'break-word',
    },
    footerHeader: {
        color: 'white',
        fontSize: '32px',
        fontFamily: 'Lemonada',
        fontWeight: '575',
        lineHeight: '30px',
        marginBottom: '24px',
        wordWrap: 'break-word',
    },
    footerQuote: {
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Lemonada',
        fontWeight: '380',
        lineHeight: '27.2px',
        marginBottom: '36px',
        textAlign: 'center',
        wordWrap: 'break-word',
    },
    footerSocials: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
    },
    developerFooter: {
        width:'102%',
        backgroundColor: '#595959',
        padding: '10px 20px',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'IBM Plex Sans Arabic',
        fontSize: '16px',
        lineHeight: '28.8px',
        boxSizing: 'border-box',
    },
    developerText: {
        margin: '0',
    },
    developerLink: {
        color: '#5E8CEA',
        fontSize: '20px',
        textDecoration: 'none',
    }
};

export default Footer;
