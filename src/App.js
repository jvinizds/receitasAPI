import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaCocktail, FaImage } from 'react-icons/fa'
import { BiLinkExternal } from 'react-icons/bi'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function App() {

  /*Constante para definir o tipo de pesquisa: prato ou coquetel*/
  const [procuraTipo, setProcuraTipo] = useState('')

  /*Função para definir qual será a busca(função) feita: prato ou coquetel*/
  function pesquisaTipo() {
    if (procuraTipo === 'coquetel') {
      buscaCoquetel();
    } else {
      buscaPrato();
    }
  }

  /*-------------------------------------------------------------------------------------*/
  /*A partir dessa linha, apenas codigo relacionado a receita de prato
    Criado constante para a receita do prato.*/
  const [prato, setPrato] = useState([])


  /*Constante para mudar o estado do modal do coquetel(Abrir e Fechar)*/
  const [mostrarPrato, setMostrarPrato] = useState(false)

  /*Contante para fechar a modal (para abrir foi direto pela função)*/
  const fecharPrato = () => setMostrarPrato(false)

  /*Função para trazer a receita do prato usando a API TheMealDB */
  async function buscaPrato() {
    let urlPrato = "https://www.themealdb.com/api/json/v1/1/random.php"

    await fetch(urlPrato)
      .then(response => response.json())
      .then(data => {
        setPrato(data.meals[0])
      })
      .catch(function (error) {
        console.error(`Erro ao obter prato: ${error.message}`)
      })

      setMostrarPrato(true)
  }

  /*Função para formatar ingredientes e as medidas do prato e assim lista-los já formatado*/
  function ListaIngredientesPrato() {

    let ingredientesPrato = []
    let medidasPrato = []
    let ingredienteCompletoPrato = []
    let i = 0
    let j = 0

    /*For para passar por todas as propriedade e armazenar em um outro array apenas os ingredientes, caso não sejam nulos, vazios, etc*/
    for (const key in prato) {
      if (key.indexOf("strIngredient") > -1) 
      {
          if(!prato[key])
          {
            i = i+1
          }else{
            ingredientesPrato[i] = prato[key]
            i = i+1
          }
      }
    }

    //let listaIngredientesFormatadoPrato = ingredientesPrato.map((ingrediente) => ingrediente.charAt(0).toUpperCase() + ingrediente.slice(1));

    //let listaIngredientes = listaIngredientesFormatado.map((ingrediente) => <li>{ingrediente}</li>);

    /*For para passar por todas as propriedade e armazenar em um outro array apenas as medidas, caso não sejam nulos, vazios, etc*/
    for (const key in prato) {
      if (key.indexOf("strMeasure") > -1) 
      {
          if(!prato[key])
          {
            j = j+1
          }else{
            medidasPrato[j] = prato[key]
            j = j+1
          }
      }
    }

    //let listaMedidasFormatada = medidas.map((medida) => medida.charAt(0).toUpperCase() + medida.slice(1));

    /*For para passar pelos ingrediente e medidas e junta-los em um outro array para ficarem completos*/
    for (let k = 1; k < ingredientesPrato.length; k++) {
      ingredienteCompletoPrato[k] = medidasPrato[k] + ' of ' +ingredientesPrato[k]
    }

    let listaIngredientesPrato = ingredienteCompletoPrato.map((ingrediente) => <li>{ingrediente}</li>);

   return(
    <>{listaIngredientesPrato}</>
   )
  }

  /*Const para ativa o ToolTip na Modal para exibir a imagem do Coquetel */
  const imagemPrato = (props) => (
    <Tooltip {...props}>
      <img src={prato.strMealThumb} width={230} alt='Imagem do Prato' />
    </Tooltip>
  );

  /*Codigo relacionado ao prato acabou */
  /*-------------------------------------------------------------------------------------*/

  /*-------------------------------------------------------------------------------------*/
  /*A partir dessa linha, apenas codigo relacionado a receita de coquetel
    Criado constante para a receita do coquetel.*/
  const [coquetel, setCoquetel] = useState([])

  /*Constante para mudar o estado do modal do coquetel(Abrir e Fechar)*/
  const [mostrarCoquetel, setMostrarCoquetel] = useState(false)

  /*Contante para fechar a modal (para abrir foi direto pela função)*/
  const fecharCoquetel = () => setMostrarCoquetel(false)

  /*Função para trazer a receita do coquete usando a API TheCocktailDB */
  async function buscaCoquetel() {
    let urlCoquetel = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

    await fetch(urlCoquetel)
      .then(response => response.json())
      .then(data => {
        setCoquetel(data.drinks[0])
      })
      .catch(function (error) {
        console.error(`Erro ao obter coquetel: ${error.message}`)
      })

    setMostrarCoquetel(true)
  }

  /*Função para formatar ingredientes e as medidas do coquetel e assim lista-los já formatado*/
  function ListaIngredientesCoquetel() {

    let ingredientesCoquetel = []
    let medidasCoquetel = []
    let ingredienteCompletoCoquetel = []
    let i = 0
    let j = 0

    /*For para passar por todas as propriedade e armazenar em um outro array apenas os ingredientes, caso não sejam nulos, vazios, etc*/
    for (const key in coquetel) {
      if (key.indexOf("strIngredient") > -1) 
      {
          if(!coquetel[key])
          {
            i = i+1
          }else{
            ingredientesCoquetel[i] = coquetel[key]
            i = i+1
          }
      }
    }

    /*For para passar por todas as propriedade e armazenar em um outro array apenas as medidas, caso não sejam nulos, vazios, etc*/
    for (const key in coquetel) {
      if (key.indexOf("strMeasure") > -1) 
      {
          if(!coquetel[key])
          {
            j = j+1
          }else{
            medidasCoquetel[j] = coquetel[key]
            j = j+1
          }
      }
    }

    /*For para passar pelos ingrediente e medidas e junta-los em um outro array para ficarem completos*/
    for (let k = 1; k < ingredientesCoquetel.length; k++) {
      if (!medidasCoquetel[k] ) {
        ingredienteCompletoCoquetel[k] = ingredientesCoquetel[k]
      }else{
        ingredienteCompletoCoquetel[k] = medidasCoquetel[k] + ' of ' + ingredientesCoquetel[k]
      }

      
    }

    let listaIngredientesCoquetel = ingredienteCompletoCoquetel.map((ingrediente) => <li>{ingrediente}</li>);

   return(
    <>{listaIngredientesCoquetel}</>
   )
  }

  /*Const para ativa o ToolTip na Modal para exibir a imagem do Coquetel */
  const imagemCoquetel = (props) => (
    <Tooltip {...props}>
      <img src={coquetel.strDrinkThumb} width={230} alt='Imagem do Coquetel' />
    </Tooltip>
  );

  /*Codigo relacionado ao coquetel acabou */
  /*-------------------------------------------------------------------------------------*/

  return (

    <>

      {/*Uma simples Navbar para mostrar o nome do site*/}
      <Navbar bg="secondary">
        <Navbar.Brand href="#inicio" className="text-light"  >RandomRecipes <FaCocktail className="text-dark" size="40" /></Navbar.Brand>
      </Navbar>

      {/*Form para escolha do tipo da pesquisa*/}
      <Form>
        <Form.Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Form.Control as="select" id="escolha" onChange={e => setProcuraTipo(e.target.value)}>
              <option value="prato" >Random Meal</option>
              <option value="coquetel" >Random Cocktail</option>
            </Form.Control>
          </Col>
          &nbsp;
          <Col xs="auto">
            <Button variant="warning" onClick={pesquisaTipo}>Search</Button>
          </Col>
        </Form.Row>
      </Form>

      {/*Modal Prato*/}
      <Modal
        show={mostrarPrato}
        onHide={fecharPrato}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>
              {prato.strMeal}
              &nbsp;
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={imagemPrato}
              >

                <FaImage />
              </OverlayTrigger>
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>This is a {prato.strArea} meal</h5>
          <h5>Category of this meal:</h5>
          <p>{prato.strCategory}</p>
          <h5>Ingredients</h5>
          <ul>
            <ListaIngredientesPrato />
          </ul>
          <h5>Instructions</h5>
          <p>{prato.strInstructions}</p>
          <h5>YouTube Link <a href={prato.strYoutube}><BiLinkExternal /></a></h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharPrato}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

      {/*Modal Coquetel*/}
      <Modal
        show={mostrarCoquetel}
        onHide={fecharCoquetel}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>
              {coquetel.strDrink}
              &nbsp;
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={imagemCoquetel}
              >

                <FaImage />
              </OverlayTrigger>
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Type of Cocktail:</h5>
          <p>{coquetel.strAlcoholic}</p>
          <h5>Ingredients</h5>
          <ul>
            <ListaIngredientesCoquetel />
          </ul>
          <h5>Instructions</h5>
          <p>{coquetel.strInstructions}</p>
          <h6>We recommend a {coquetel.strGlass}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharCoquetel}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
