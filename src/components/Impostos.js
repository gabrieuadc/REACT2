import Table from 'react-bootstrap/Table';
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Next } from 'react-bootstrap/esm/PageItem';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Impostos(){

    const [ receita, setreceita] = useState()
	const [ pis, setpis] = useState()
	const [ cofins, setcofins] = useState()
	const [ valortotal, setvalortotal] = useState()

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

// 	function createPost(project){
// 		fetch('http://localhost:4000/fluxo/',{
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(project)
// 		})
// 		.then((resp) => resp.json())
// 		.then((data) => {
// 			alert("Cadatrado com Sucesso")
// 			window.location.reload(true)
// 		})
// 		.catch((err) => console.log(err))
// };

// function deletePost(id){
// 	fetch(`http://localhost:4000/fluxo/${id}`,{
// 		method: 'DELETE',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	})
// 	.then((resp) => resp.json())
// 	.then((data) => {
// 		setCategories(categories.filter((categorie)=> categorie.id !== id))
// 		alert("Deletado com Sucesso")
// 		window.location.reload(true)

// 	})
// 	.catch((err) => console.log(err))
// };

// function pathPost(id){
// 	fetch(`http://localhost:4000/fluxo/${id}`,{
// 		method: 'PATH',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	})
// 	.then((resp) => resp.json())
// 	.then((data) => {
// 		alert("Alterado com Sucesso")
// 	})
// 	.catch((err) => console.log(err))
// };

	//   function submit(e) {
	// 	e.preventDefault()
	// 	createPost(project)
	// }


	function handleChange(e){
		setCategories({...categories, [e.target.name]: e.target.value})		
	}

	async function handleChanger(){
		try{
            setreceita([categories].map((infos)=> infos.receita)); 
			setpis([categories].map((infos)=> infos.receita * 0.0065));
			setcofins([categories].map((infos)=> infos.receita * 0.003));
			setvalortotal([categories].map((infos)=> parseInt(pis)+ parseInt((cofins))));
            console.log(cofins);
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
		alignItems: 'start-center',
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
        <div>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" >
        <Tab eventKey="home" title="CONTRIBUIÇÕES">

		<h2>PIS/COFINS</h2><br></br>
        <div style={styles2}>
		<Form style={{ width: '400px',  fontWeight: "bold" }}>

		<Form.Group className="mb-3" >
		  <FloatingLabel label="RECEITA BRUTA" className="mb-2">
		  <Form.Control name ="receita" type="number" onChange={handleChange} />
		  </FloatingLabel>
		</Form.Group>
		<Form.Group className="mb-3" >
		  <FloatingLabel label="(-) DEVOLUÇÕES E CANCELAMENTOS" className="mb-2">
		  <Form.Control name ="dev" type="number"  />
		  </FloatingLabel>
		</Form.Group>

        <Form.Group className="mb-3" >
		  <FloatingLabel label="(-) IPI" className="mb-2">
		  <Form.Control name ="dev" type="number"  />
		  </FloatingLabel>
		</Form.Group>

        <Form.Group className="mb-3" >
		  <FloatingLabel label="(-) ISENTAS/MONOFASICAS" className="mb-2">
		  <Form.Control name ="dev" type="number"  />
		  </FloatingLabel>
		</Form.Group>

        <Form.Group className="mb-3" >
		  <FloatingLabel label="PIS" className="mb-2">
		  <Form.Control name ="pis" type="number"  value={pis} />
		  </FloatingLabel>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <FloatingLabel label="COFINS" className="mb-2">
		  <Form.Control name ="cofins" type="number"  value={cofins} />
		  </FloatingLabel>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <FloatingLabel label="(=) Valor a pagar" className="mb-2">
		  <Form.Control name ="name" type="number" value={valortotal}/>
		  </FloatingLabel>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <FloatingLabel label="Exercicio" className="mb-2">
		  <Form.Control name ="name" type="month"/>
		  </FloatingLabel>
		</Form.Group>

		<Button variant="primary" onClick={() => handleChanger()}>
		  Apurar
		</Button>

		<Button variant="primary" type="submit">
		  Salvar
		</Button>
	  </Form>
      </div>
      </Tab>
      <Tab eventKey="profile" title="IRPJ/CSLL">

      <h2>IRPJ E CSLL</h2><br></br>
      <Form style={{ width: '400px',  fontWeight: "bold" }}>

        <Form.Group className="mb-3" >
        <FloatingLabel label="RECEITA BRUTA" className="mb-2">
        <Form.Control name ="receita" type="number" onChange={handleChange} />
        </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" >
        <FloatingLabel label="(-) DEVOLUÇÕES E CANCELAMENTOS" className="mb-2">
        <Form.Control name ="dev" type="number"  />
        </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" >
        <FloatingLabel label="(-) DESCONTOS INCONDICIONAIS" className="mb-2">
        <Form.Control name ="dev" type="number"  />
        </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" >
        <FloatingLabel label="IRPJ" className="mb-2">
        <Form.Control name ="irpj" type="number"  value={pis} />
        </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" >
        <FloatingLabel label="ADICIONAL IRPJ" className="mb-2">
        <Form.Control name ="adcirpj" type="number"  value={pis} />
        </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" >
        <FloatingLabel label="CSLL" className="mb-2">
        <Form.Control name ="csll" type="number"  value={cofins} />
        </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" >
        <FloatingLabel label="(=) Valor a pagar" className="mb-2">
        <Form.Control name ="name" type="number" value={valortotal}/>
        </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" >
        <FloatingLabel label="Exercicio" className="mb-2">
        <Form.Control name ="name" type="month"/>
        </FloatingLabel>
        </Form.Group>

        <Button variant="primary" onClick={() => handleChanger()}>
        Apurar
        </Button>

        <Button variant="primary" type="submit">
        Salvar
        </Button>
        </Form>
        </Tab>
        <Tab eventKey="CONTRIBUIÇÃO PREVIDÊNCIÁRIA" title="CPP">        </Tab>
        <Tab eventKey="LALUR" title="LALUR">        </Tab>
        </Tabs>
        </div>
	);
}

export default Impostos;

	// function handleChange(e){
	// 	setfilter(e.target.value + "T00:00:00.000Z")
	// 	let date2= new Date(e.target.value);
	// 	let date3= new Date(date2.getFullYear(), date2.getUTCMonth()+1, 0);
	// 	setfilter2(date3.toISOString());
	// }