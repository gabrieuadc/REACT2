import Table from 'react-bootstrap/Table';
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';


function DespGestao(){

	const [categories, setCategories] = useState([])
	const [valores, setvalores] = useState([])

	const [name, setname] = useState("")
	const [contato, setcontato] = useState("")
	const [despesas, setdespesa] = useState("")
	const [valor, setvalor] = useState("")
	const [data, setdata] = useState("")

	const [filter, setfilter] = useState("");
	const [ filter2, setfilter2] = useState("");

	const [desabilitar, setDesabilitar] = useState(true);

	// interface Despss {
	// 	name: String,
	// 	contact: Number,
	// 	services: String,
	// 	value: Number,
	// 	date: Date,
	//   };
	  

	useEffect(() => {
	  fetch('http://localhost:4000/despesa/',{
		  method: 'GET',
		  headers: {
			  'Content-Type': 'application/json',
		  },
	  })
	  .then((resp) => resp.json())
	  .then((data) => {
		  setCategories(data)
	  })
	  .catch((err) => console.log(err))
  }, []);

  function deletePost(id){
	fetch(`http://localhost:4000/despesa/${id}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((resp) => resp.json())
	.then((data) => {
		setCategories(categories.filter((categorie)=> categorie.id !== id))
		alert("Deletado com Sucesso")

	})
	.catch((err) => console.log(err))
};

function pathPost(id){
	fetch(`http://localhost:4000/despesa/${id}`,{
		method: 'PATH',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((resp) => resp.json())
	.then((data) => {
		alert("Alterado com Sucesso")
	})
	.catch((err) => console.log(err))
};

	function handleChange1(e){
		let date1= (e.target.value+ "-01T00:00:00.000Z")
		setfilter(date1)
		let date2= new Date(e.target.value);
		let date3= new Date(date2.getFullYear(), date2.getUTCMonth()+1, 0);
		setfilter2(date3.toISOString());
	}

	function desabilitar2(e) {
		setDesabilitar(false);
	}

	function distruct(){
		let teste2=categories;
		// this.categories.map( (categorie) => {if (categorie !== undefined) setvalores(categorie); });
		console.log(teste2.values());
	}

	const styles2 = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	  };

	  const styles3 = {
		color: "#E9573F",
		backgroundColor: "#000000",
	  };

	  const styles4 = {
		color: "#F6BB42",
		backgroundColor: "#000000",
	  };

	  const [project, setProject] = useState([]);

	  function postDesp(project){
		  fetch('http://localhost:4000/despesa/',{
			  method: 'POST',
			  headers: {
				  'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(project)
		  })
		  .then((resp) => resp.json())
		  .then((data) => {
			  alert("Cadatrado com Sucesso")
		  })
		  .catch((err) => console.log(err))
  };
  
  function submit(e) {
	  e.preventDefault()
	  postDesp(project)
  }
  
  function handleChange(e){
	  setProject({...project, [e.target.name] : e.target.value})
	  console.log(e.target.value)
  }



	return(
		<div style={styles2}>

		<Tabs defaultActiveKey="gestaodespesa" id="uncontrolled-tab-example" className="mb-3" >
        <Tab eventKey="caddespesa" title="Cadastro- Despesa">
		<Form onSubmit={submit}>
		<h2>Despesas- Cadastro</h2><br/>
		<Form.Group className="mb-3" >
		  <Form.Label >Fornecedor</Form.Label>
		  <Form.Control name ="name" type="text" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Nome completo.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <Form.Label >Telefone</Form.Label>
		  <Form.Control name ="contact" type="number" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Telefone de contato.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <Form.Label>Despesa</Form.Label>
		  <Form.Control name ="service" type="text" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Despesas realizadas.
		  </Form.Text>
		</Form.Group>
	
		<Form.Group className="mb-3">
		  <Form.Label>Valor</Form.Label>
		  <Form.Control name ="value" type="number" onChange={handleChange}/>
		</Form.Group>
  
		<Form.Group className="mb-3">
		  <Form.Label>Data</Form.Label>
		  <Form.Control name ="date" type="date" onChange={handleChange} />
		</Form.Group>
	

		<Form.Group className="mb-3" controlId="formBasicCheckbox">
		  <Form.Check type="checkbox" label="Check" />
		</Form.Group>
		<Button variant="primary" type="submit">
		  Salvar
		</Button>
	  </Form>


		</Tab>
			<Tab eventKey="gestaodespesa" title="Gestão- Despesa">
				<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Filtro de vigência</Form.Label>
				<Form.Control name="filter" type="month" placeholder="Insira a vigência desejada" onChange={handleChange1}/>
				<Form.Text className="text-muted">
					Mês e ano a ser filtrado as despesas.
				</Form.Text>
				</Form.Group>
				</Form>
				<Table striped bordered hover variant="dark" >
				<thead>
				<tr>
					<th>Nome do Fornecedor</th>
					<th>Contato</th>
					<th>Despesas</th>
					<th>Valor</th>
					<th>Data</th>
					<th>Editar</th>
					<th>Deletar</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><input className="form-control" value={categorie.name} disabled={desabilitar}></input></p>})}</td>
					<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><input className="form-control" value={categorie.contact} disabled={desabilitar}></input></p>})}</td>
					<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><input className="form-control" value={categorie.service} disabled={desabilitar}></input></p>})}</td>
					<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><input className="form-control" value={categorie.value} disabled={desabilitar}></input></p>})}</td>
					<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><input className="form-control" value={categorie.date.replace('T00:00:00.000Z', '')} disabled={desabilitar}></input></p>})}</td>
					<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><button style={styles4} onClick={() => distruct()}><BsFillPencilFill /></button></p>})}</td>
					<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><button style={styles3} onClick={() => deletePost(categorie._id)}><BsFillTrashFill/></button></p>})}</td>
				</tr>
				</tbody>
			</Table>
			</Tab>		
		</Tabs>


	  </div>
	);
}

export default DespGestao;

	// function handleChange(e){
	// 	setfilter(e.target.value + "T00:00:00.000Z")
	// 	let date2= new Date(e.target.value);
	// 	let date3= new Date(date2.getFullYear(), date2.getUTCMonth()+1, 0);
	// 	setfilter2(date3.toISOString());
	// }