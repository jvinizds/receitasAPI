import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaCocktail } from 'react-icons/fa'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'


function App() {

  const [procuraTipo, setProcuraTipo] = useState('')
  const [pesquisa, setPesquisa] = useState('')
  const [prato, setPrato] = useState(null)


  async function buscaCoquetel() {
    let url = `www.themealdb.com/api/json/v1/1/random.php`

    await fetch(url)
    .then(response =>response.json())
    .then(data => {
      setPrato(data)
    })
    .catch(function (error) {
      console.error('Houve um erro na requisição' + error.message)
    })
  }

  return (

    <>
      <Navbar bg="secondary">
        <Navbar.Brand href="#inicio" className="text-light"  >CocktailGuide <FaCocktail className="text-dark" size="40" /></Navbar.Brand>
      </Navbar>

      <Form>
        <Form.Row className="justify-content-center mt-4"> 
          <Col xs="auto">
            <Form.Control as="select" id="escolha" onChange={e => setProcuraTipo(e.target.value)}>
              <option value="meal" >Random Meal</option>
              <option value="cocktail" >Random Cocktail</option>
            </Form.Control>
          </Col>
          &nbsp;
          <Col xs="auto">
            <Button variant="warning" onClick={}>Search</Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  );
}

export default App;
