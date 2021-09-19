import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './OurTeam.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const OurTeam = () => {
    return (
        <>
            <Navbar />
            <div className={styles.ourteamcontainer}>
                <div className={styles.titlecontainer}>
                    <h1>Conoce nuestro equipo</h1>
                    <h3>Full Stack Web Developers - Cohorte Ft15a</h3>
                </div>
                <div className={styles.wholeteam}>
                    <div className={styles.personaldiv}>
                        <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://scontent.fmga3-1.fna.fbcdn.net/v/t1.6435-9/119025870_3909033542447401_4722914994352697087_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=cYzCpjBYOo4AX-GR7tW&_nc_ht=scontent.fmga3-1.fna&oh=d4a03cbdaa002c585b39487748a3fc8a&oe=616867F0" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Benjamín Cáceres</h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Aunque descubri un poco tarde el mundo de la programacion siempre me encanto la tecnoligia y encontrar nuevos retos y algo que requiera de constante aprendisaje es algo que me hace sentir comodo</p>
                            <div>
                                <a href="https://www.linkedin.com/in/benjamin-caceres/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/benjamin-caceres" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.personaldiv}>
                        <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://media-exp1.licdn.com/dms/image/D4E35AQE072W_V_4DRw/profile-framedphoto-shrink_800_800/0/1630095212138?e=1631934000&v=beta&t=XeBA0oZS3lNeZWFL7fI77kKck0Zfo_lMF3glSLqTasQ" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Christian Quevedo</h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                            <div>
                                <a href="https://www.linkedin.com/in/cristian-quevedo/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/xerxes97" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.personaldiv}>
                    <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://media-exp1.licdn.com/dms/image/C4E03AQETcKCzxV2E5g/profile-displayphoto-shrink_800_800/0/1627913246904?e=1637193600&v=beta&t=2TB0DVH3cCqtJ3ruSwSNgKZsZh9IIuoR-b29htQ7ooU" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Valentin Alessandrini </h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                            <div>
                                <a href="https://www.linkedin.com/in/valentin-alessandrini-zapata/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/valentinaless07" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.wholeteam}>
                    <div className={styles.personaldiv}>
                    <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://www.w3schools.com/howto/img_avatar.png" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Alejandro Abad</h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                            <div>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/abadalejandro" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.personaldiv}>
                    <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://media-exp1.licdn.com/dms/image/D4E35AQHYWWTwi-jusg/profile-framedphoto-shrink_800_800/0/1630493754020?e=1631934000&v=beta&t=tXwo-MKgfPG4SlLg8Ouo-nWebHJOwn-4H2OknqTx4ro" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Alex Marin</h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                            <div>
                                <a href="https://www.linkedin.com/in/alexmarinmendez/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/alexmarinmendez" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.personaldiv}>
                    <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://media-exp1.licdn.com/dms/image/C4E03AQGaFI5UeyaOVA/profile-displayphoto-shrink_800_800/0/1536330517034?e=1637193600&v=beta&t=LGTXO3w45UIudcbRiTxOw6IVqQsJV60FdK8jWFJqw_0" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Gaspar Almada</h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Con varios años de experiencia en la industria de la animación y diseño 3D, he iniciando un nuevo camino profesional al adquirir mis primeras experiencias en el desafiante y apasionante mundo del desarrollo IT. Actualmente me encuentro buscando formar parte de un equipo creador de soluciones tecnológicas, para aportar mis capacidades y crecer profesionalmente.</p>
                            <div>
                                <a href="https://www.linkedin.com/in/gaspar-almada/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/almadagaspar" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.wholeteam}>
                    <div className={styles.personaldiv}>
                    <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://media-exp1.licdn.com/dms/image/C4D03AQFkWUyT4VCPVQ/profile-displayphoto-shrink_800_800/0/1630428625173?e=1637193600&v=beta&t=h7oHVv6vdonXw7wd3CRVxa-f41-YdPAXGN9rMuv1IDc" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Emiliano Duartes</h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                            <div>
                                <a href="https://www.linkedin.com/in/emilianoduartes/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/emilianoduartes" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.personaldiv}>
                    <div className={styles.picpersonal} style={{ backgroundImage: "url(" + "https://media-exp1.licdn.com/dms/image/C4E03AQFrOvcsq0o5eg/profile-displayphoto-shrink_800_800/0/1626391224513?e=1637193600&v=beta&t=D0eMnM_1QLX5ja8LW9HtRjUUU0CAc0wuYe_wLj0PJMo" + ")" }}></div>
                        <div className={styles.nameperson}>
                            <h2>Gustavo Riera</h2>
                            <h3>Full Stack Web Developer</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptates quae doloribus veritatis beatae numquam officiis magni necessitatibus excepturi minima consequatur, nostrum velit saepe eum impedit incidunt illum debitis maxime.</p>
                            <div>
                                <a href="https://www.linkedin.com/in/gustavo-riera-fullstackdev/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faLinkedin} />
                                </a>
                                <a href="https://wa.link/a9hfcd" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faWhatsapp} />
                                </a>
                                <a href="https://github.com/Gustavitory" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                                </a>
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