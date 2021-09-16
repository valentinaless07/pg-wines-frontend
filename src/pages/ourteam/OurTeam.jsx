import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './OurTeam.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faLinkedin, faTwitter, faWhatsapp, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';

const OurTeam = () => {
    return (
        <>
        <Navbar />
        <div className={styles.ourteamcontainer}>
            <div className={styles.titlecontainer}>
                <h1>Conoce nuestro equipo</h1>
                <h3>Lorem impus</h3>
            </div>
            <div className={styles.wholeteam}>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
               
            </div>
            <div className={styles.wholeteam}>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
                
            </div>
            <div className={styles.wholeteam}>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
                <div className={styles.personaldiv}>
                    <div className={styles.picpersonal}></div>
                    <div className={styles.nameperson}>
                        <h2>Name</h2>
                        <h3>puesto</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                        <div>
                            <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                            <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                            <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
        <Footer />
        </>
    )
}

export default OurTeam;