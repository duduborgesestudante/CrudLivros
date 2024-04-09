/* eslint-disable no-unused-vars */
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [livros, setLivros] = useState([]);
  const [add, setAdd] = useState(true)
  const [novoLivro, setNovoLivro] = useState({
    isbn: '',
    titulo: '',
    editora: '',
    autor: '',
    genero: ''
  });
  useEffect(() => {
    fetchLivros();
  }, []);
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8090/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar Livros:', error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevVeiculo) => ({
      ...prevVeiculo,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/livros', novoLivro);
      fetchLivros();
      setNovoLivro({
        isbn: '',
        titulo: '',
        editora: '',
        autor: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao criar o Livro:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir o Livro:', error);
    }
  };
  const handleUpdate = async (id, veiculoAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/livros/${id}`, veiculoAtualizado);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao atualizar o Livro:', error);
    }
  };

  return (
    < div >
      <h1>Gerenciamento de Livros</h1>
      {
        add ? (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="isbn"
                placeholder="Isbn"
                value={novoLivro.isbn}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="titulo"
                placeholder="Titulo"
                value={novoLivro.titulo}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="editora"
                placeholder="Editora"
                value={novoLivro.editora}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="autor"
                placeholder="Autor"
                value={novoLivro.autor}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="genero"
                placeholder="Gênero"
                value={novoLivro.genero}
                onChange={handleInputChange}
              />
              <button type="submit">Adicionar o Livro</button>
            </form>
          </>
        ) : (
          <>
            <form >
              <input
                type="text"
                name="isbn"
                placeholder="Isbn"
                value={novoLivro.isbn}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="titulo"
                placeholder="Titulo"
                value={novoLivro.titulo}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="editora"
                placeholder="Editora"
                value={novoLivro.editora}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="autor"
                placeholder="Autor"
                value={novoLivro.autor}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="genero"
                placeholder="Gênero"
                value={novoLivro.genero}
                onChange={handleInputChange}
              />
              <button>Editar o Livro</button>


            </form>
          </>
        )
      }



      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            {livro.isbn} - {livro.titulo} {livro.editora} {livro.autor} {livro.genero}

            <button onClick={() => handleDelete(livro.id)}>Excluir</button>

            <button
              onClick={() =>
                handleUpdate(livro.id, {
                  ...livro,
                  isbn: novoLivro.isbn,
                  titulo: novoLivro.titulo,
                  editora: novoLivro.editora,
                  autor: novoLivro.autor,
                  genero: novoLivro.genero,


                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div >
  );

}

export default App
