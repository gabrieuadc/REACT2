import logo from './logo.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Estoque from './components/Estoque';
import FluxoCaixa from './components/fluxoCaixa';
import Impostos from './components/Impostos';
import CustoProd from './components/CustoProd';
import DespGestao from './components/despGestao';
import Services1 from './components/Services';
import Empregados from './components/Empregados';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const stylesHead = {
  display: 'flex-inline',
  alignItems: 'left',
};

const stylesBody = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '5em',
  };

  const footer = {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    };

function App() {


  return (
    <div className="App">
    <header style={stylesHead}>
    <Navbar bg="dark" variant="dark">
      <Container >
        <Navbar.Brand><img src={logo} width="70" height="40"/>React-Gestão de Serviços</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Agendamento/Despesas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Services">Agendamento</NavDropdown.Item>
              <NavDropdown.Item href="/Despesas">Despesas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Gestão" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Empregados">Empregados</NavDropdown.Item>
              <NavDropdown.Item href="/Estoque">Estoque</NavDropdown.Item>
              <NavDropdown.Item href="/Caixa">Caixa</NavDropdown.Item>
              <NavDropdown.Item href="/Impostos">Impostos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Relatórios" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Empregados">Relatório anual</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
    <body style={stylesBody}>
    <Router>
      <Routes>
            <Route path="/" element={<Home />} > </Route>
      </Routes>
      <Routes>
            <Route path="/Services" element={<Services1 />} > </Route>
      </Routes>
      <Routes>
            <Route path="/Despesas" element={<DespGestao/>} > </Route>
      </Routes>
      <Routes>
            <Route path="/Empregados" element={<Empregados />} > </Route>
      </Routes>
      <Routes>
            <Route path="/Estoque" element={<Estoque />} > </Route>
      </Routes>
      <Routes>
            <Route path="/Caixa" element={<FluxoCaixa />} > </Route>
      </Routes>
      <Routes>
            <Route path="/Impostos" element={<Impostos />} > </Route>
      </Routes>
    </Router>
    </body>
  {/* <footer className="mt-auto" >
    <div style={footer}>
      <p>Criado por Gabriel Diniz Machado</p>
    </div>
  </footer> */}
  </div>
  );


}

export default App;