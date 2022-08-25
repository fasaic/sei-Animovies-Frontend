import { Container, Row, Col, Card } from 'react-bootstrap'
import githubImg from '../images/github.png'



const About = () => {
    return (
        <>
            <h1 className="text-center m-4">About The Developers</h1>
            <Container className="container">
                <Row>
                    <Col className="col-lg-4">
                        <Card className="card p-0">
                            <Card.Img className="card-image" src="https://i.pinimg.com/736x/74/7c/0d/747c0d57add5c4d79639594ee5fcdd1a--sheriff-woody.jpg"
                                    alt=""></Card.Img>
                            <Card.Body className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">Ridwan Arshad</h4>
                                <h5>Software Engineer</h5>
                                <h6>About me</h6>
                                <a target='_blank' rel="noreferrer" href='https://github.com/Riddles-sys'><img className="w-25 align-items-center" src={githubImg} alt="github"/></a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-lg-4">
                        <Card className="card p-0">
                            <Card.Img className="card-image" src="https://i.pinimg.com/736x/74/7c/0d/747c0d57add5c4d79639594ee5fcdd1a--sheriff-woody.jpg"
                                    alt=""></Card.Img>
                            <Card.Body className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">Ridwan Arshad</h4>
                                <h5>Software Engineer</h5>
                                <h6>About me</h6>
                                <a target='_blank' rel="noreferrer" href='https://github.com/Riddles-sys'><img className="w-25 align-items-center" src={githubImg} alt="github"/></a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-lg-4">
                        <Card className="card p-0">
                            <Card.Img className="card-image" src="https://i.pinimg.com/736x/74/7c/0d/747c0d57add5c4d79639594ee5fcdd1a--sheriff-woody.jpg"
                                    alt=""></Card.Img>
                            <Card.Body className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">Ridwan Arshad</h4>
                                <h5>Software Engineer</h5>
                                <h6>About me</h6>
                                <a target='_blank' rel="noreferrer" href='https://github.com/Riddles-sys'><img className="w-25 align-items-center" src={githubImg} alt="github"/></a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default About