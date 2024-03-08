import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent } from "react"
import { Navbar, Container, Nav, Col, Form, Row } from "react-bootstrap"
import { NavLink } from 'react-router-dom'

type Props = {
    searchInput: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Header = (props: Props) => {

    return (
        <Navbar expand="lg" bg="light" data-bs-theme="light" >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-2" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'p-2 active' : 'p-2'}>Movies in theaters</NavLink>
                        <NavLink to="/movies-coming" className={({ isActive }) => isActive ? 'p-2 active' : 'p-2'}>Coming soon</NavLink>
                        <NavLink to="/top-rated-india" className={({ isActive }) => isActive ? 'p-2 active' : 'p-2'}>Top rated Indian</NavLink>
                        <NavLink to="/top-rated-movies" className={({ isActive }) => isActive ? 'p-2  active' : 'p-2'}>Top rated movies</NavLink>
                        <NavLink to="/favourite" className={({ isActive }) => isActive ? 'p-2 active' : 'p-2'}>Favorites</NavLink>

                    </Nav>

                    <Form className="d-lg-inline p-2">
                        <Row className="align-items-stretch">
                            <Col className="flex-xs-grow-1 p-0">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    onChange={props.onChange}
                                    value={props.searchInput}
                                />
                            </Col>
                            <Col xs="auto" className="bg-info d-flex align-items-center">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Col>
                        </Row>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export { Header }