import Table from 'react-bootstrap/Table';
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Next } from 'react-bootstrap/esm/PageItem';

function FluxoCaixa(){

	const [ caixaOP, setcaixaOP] = useState()
	const [ caixaINV, setcaixaINV] = useState()
	const [ caixaFIN, setcaixaFIN] = useState()

	const [categories, setCategories] = useState([]);
	const [project, setProject] = useState([]);
	const [desabilitar, setDesabilitar] = useState(true);


	// const [clientes, setClientes] = useState(0)
	// const [fornecedores, setFornecedores] = useState(0)
	// const [despesas, setDespesas] = useState(0)
	// const [compraatv, setCompraatv] = useState(0)
	// const [recebdiv, setRecebdiv] = useState(0)
	// useEffect(() => {
	// 	fetch('http://localhost:4000/fluxo/',{
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 	.then((resp) => resp.json())
	// 	.then((data) => {
	// 		setCategories(data)
	// 	})
	// 	.catch((err) => console.log(err))
	// }, []);

	function createPost(project){
		fetch('http://localhost:4000/fluxo/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project)
		})
		.then((resp) => resp.json())
		.then((data) => {
			alert("Cadatrado com Sucesso")
			window.location.reload(true)
		})
		.catch((err) => console.log(err))
};

function deletePost(id){
	fetch(`http://localhost:4000/fluxo/${id}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((resp) => resp.json())
	.then((data) => {
		setCategories(categories.filter((categorie)=> categorie.id !== id))
		alert("Deletado com Sucesso")
		window.location.reload(true)

	})
	.catch((err) => console.log(err))
};

function pathPost(id){
	fetch(`http://localhost:4000/fluxo/${id}`,{
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

	  function submit(e) {
		e.preventDefault()
		createPost(project)
	}


	function handleChange(e){
		setCategories({...categories, [e.target.name]: e.target.value})		
	}

	async function handleChanger(){
		try{
			setcaixaOP([categories].map((infos)=> infos.clientes- infos.fornecedores- infos.despesas));
			setcaixaINV([categories].map((infos)=> parseInt(caixaOP)+ parseInt((infos.rdiv - infos.cativo))));
			setcaixaFIN([categories].map((infos)=> parseInt(caixaINV)+ parseInt((infos.intcap - infos.pfinan))));
		}
		catch(err){
			console.log(err);
		}
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

	  function desabilitar1(e) {
		setDesabilitar(false);
	}

	function desabilitar2(e) {
		setDesabilitar(true);
	}
	//   console.log(despesas);

	//   onChange={(valor3)=> {setDespesas(valor3.target.value)}}
	// onChange={(valor3)=> {setDespesas({...despesas,[valor3.target.name]: valor3.target.value})}} 
	// onChange={(valor1)=> {setClientes(valor1.target.value)}}


	return(
		<div style={styles2}>
		<h2>Livro caixa</h2><br></br>
		<Form onSubmit={submit} style={{ width: '400px',  fontWeight: "bold" }}>

		<Form.Group className="mb-3" controlId="formBasicEmail">
			<Form.Label>CAIXA MENSAL</Form.Label>
			<Form.Control name="filter" type="month" placeholder="Insira a vigência desejada"/>
			<Form.Text className="text-muted">
			Mês e ano a ser filtrado as despesas.
		</Form.Text>
		</Form.Group>

		<br></br>
		<Form.Group className="mb-3" >
		  <FloatingLabel label="(+) Recebimento de clientes" className="mb-2">
		  <Form.Control name ="clientes" type="number" onChange={handleChange} />
		  </FloatingLabel>
		</Form.Group>
		<Form.Group className="mb-3" >
		  <FloatingLabel label="(-) Pagamento de fornecedores" className="mb-2">
		  <Form.Control name ="fornecedores" type="number"  onChange={handleChange} />
		  </FloatingLabel>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <FloatingLabel label="(=) Saldo das disponibilidades" className="mb-2">
		  <Form.Control name ="name" type="number" value={caixaFIN}  onChange={handleChange}/>
		  </FloatingLabel>
		</Form.Group>

		{/* <Form.Group className="mb-3" >
		  <FloatingLabel label="Exercicio" className="mb-2">
		  <Form.Control name ="name" type="month"  onChange={handleChange}/>
		  </FloatingLabel>
		</Form.Group> */}

		{/* <Button variant="primary" onClick={() => handleChanger()}>
		  Apurar
		</Button> */}

		{/* <Button variant="primary" type="submit">
		  Salvar
		</Button> */}
	  </Form>
	  </div>
	);
}

export default FluxoCaixa;

	// function handleChange(e){
	// 	setfilter(e.target.value + "T00:00:00.000Z")
	// 	let date2= new Date(e.target.value);
	// 	let date3= new Date(date2.getFullYear(), date2.getUTCMonth()+1, 0);
	// 	setfilter2(date3.toISOString());
	// }