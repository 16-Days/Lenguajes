//Aarón Piñar Mora
//Lenguajes
import React, { useEffect, useState } from 'react';

/**
 * Componente principal de la aplicación.
 */
export default function App() {
  const [questions, setQuestions] = useState([]);  // Para el manejo de las preguntas en base al estado
  const [userResponses, setUserResponses] = useState({}); // Para el manejo de las respuestas de los usuarios

  // Efecto de carga inicial: obtiene las preguntas al cargar la página
  useEffect(() => {
    fetch("/preguntas")
      .then(response => response.json())
      .then(data => {
        setQuestions(data.questions);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  /**
   * Función encargada de manejar los cambios realizados en los inputs.
   * @param {string} questionId - ID de la pregunta a la que se está respondiendo.
   * @param {string} response - Respuesta ingresada por el usuario.
   */
  const handleInputChange = (questionId, response) => {
    setUserResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: response,
    }));
  };

  /**
   * Función encargada de comparar la respuesta del usuario con la respuesta correcta.
   * @param {string} questionId - ID de la pregunta que se está comparando.
   */
  const handleConfirm = (questionId) => {
    if (userResponses[questionId]) {
      const userResponse = userResponses[questionId];
      const correctAnswer = questions.find(info => info.id === questionId).respuesta;

      if (userResponse === correctAnswer) {
        console.log(`Respuesta correcta para la pregunta ${questionId}`);
      } else {
        console.log(`Respuesta incorrecta para la pregunta ${questionId}`);
      }
    } else {
      console.log(`La respuesta de la pregunta ${questionId} está vacía.`);
    }
  };

  return (
    <div>
      <div className='todasPreguntas'>
        {questions.map(info => (
          <div className='post' key={info.id}>
            <h2 className='title'>Pregunta {info.id}</h2>
            <p className='content'>&ensp;{info.content}</p>

            <p className='enun'>
              {info.title} {info.a}, {info.b} o {info.c}
            </p>
            
            <input
              className='recoInput'
              type='text'
              value={userResponses[info.id] || ''}
              onChange={(e) => handleInputChange(info.id, e.target.value)}
            />

            <button
              className={`recoButton ${userResponses[info.id] ? 'answered' : ''}`}
              onClick={() => handleConfirm(info.id)}
              disabled={!userResponses[info.id]}
            >
              Confirmar
            </button>

            <table>
              <thead>
                <tr>
                  <th className='verdad'>Correcto</th>
                  <th className='falso'>Incorrecto</th>
                </tr>
              </thead>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
