import { Container, Row, Col, Card } from 'react-bootstrap'
import githubImg from '../images/github.png'
import linkedInImg from '../images/linkedIn.png'
import about1 from '../images/about1.jpg'
import about2 from '../images/about2.png'
import about3 from '../images/about3.jpg'



const About = () => {
    return (
        <>
            <h1 className="text-center m-4">About The Developers</h1>
            <Container className=" about-container min-vh-100">
                <Row className='about-row'>
                    <Col className="col-lg-4">
                        <Card className="card p-0">
                            <Card.Img className="card-image" src={about1}
                                    alt=""></Card.Img>
                            <Card.Body className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">Fasai C.</h4>
                                <p className="font-weight-normal mb-0">Software Engineer</p>
                                {/* <h6>About me</h6> */}
                                <div className="profile-link">
                                <a target='_blank' rel="noreferrer" href='https://github.com/fasaic'><img className=" github align-items-center" src={githubImg} alt="github"/></a>
                                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/fasai-c/'><img className="github align-items-center" src={linkedInImg} alt="linkedIn"/></a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-lg-4">
                        <Card className="card p-0">
                            <Card.Img className="card-image" src={about2}
                                    alt=""></Card.Img>
                            <Card.Body className="card-content d-flex flex-column align-items-center">
                            <h4 className="pt-2">Ridwan Arshad</h4>
                                <p className="font-weight-normal mb-0">Software Engineer</p>
                                {/* <h6>About me</h6> */}
                                <div className="profile-link">
                                <a target='_blank' rel="noreferrer" href='https://github.com/Riddles-sys'><img className=" github align-items-center" src={githubImg} alt="github"/></a>
                                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/ridwan-arshad-mbpss-a99ba350/'><img className="github align-items-center" src={linkedInImg} alt="linkedIn"/></a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-lg-4 mt-3 mt-sm-0">
                        <Card className="card p-0">
                            <Card.Img className="card-image" src={about3}
                                    alt=""></Card.Img>
                            <Card.Body className="card-content d-flex flex-column align-items-center">
                            <h4 className="pt-2">Charlie Hird</h4>
                                <p className="font-weight-normal mb-0">Software Engineer</p>
                                {/* <h6>About me</h6> */}
                                <div className="profile-link">
                                <a target='_blank' rel="noreferrer" href='https://github.com/cjhird'><img className=" github align-items-center" src={githubImg} alt="github"/></a>
                                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/charlie-hird-843b75159/'><img className="github align-items-center" src={linkedInImg} alt="linkedIn"/></a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default About