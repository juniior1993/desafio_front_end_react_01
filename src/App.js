import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const[ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      "title": `Novo repositorio ${Date.now()}` ,
      "url": `http://github.com.br/newrepo_${Date.now()}`,
      "techs": [
        "NdeJS",
        "ReactNative"
      ]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if(response.status === 204) {
        const indexRepository = repositories.findIndex(repository => repository.id === id);
        repositories.splice(indexRepository, 1);
        setRepositories([...repositories]);
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
