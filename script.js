const { useState } = React;

// function checks status of API response
const checkStatus = (response) => {
  if (response.ok) {
    return response; // returns true if response status is 200 - 299
  }
  throw new Error('Request was either 404 or 500');
};

// returns json formatted response
const json = (response) => response.json();

// Movie component that displays an individual movie from search
const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <div className='row'>
      <div className='col-4 col-md-3 mb-3'>
        <a href={`https://www.imdb.com/title/${imdbID}/`} target='_blank'>
          <img src={Poster} className='img-fluid' />
        </a>
      </div>
      <div className='col-8 col-md-9 mb-3'>
        <a href={`https://www.imdb.com/title/${imdbID}/`} target='_blank'>
          <h4>{Title}</h4>
          <p>
            {Type} | {Year}
          </p>
        </a>
      </div>
    </div>
  );
};

// MovieFinder component includes the basic HTML and event listeners
const MovieFinder = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');


  // handle any changes to input and update state
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // handle submitting the movie search input
  const handleSubmit = (event) => {
    event.preventDefault();

    // get search term after form submitted
    const searchTermCopy = searchTerm.trim();
    // check if value isn't empty string
    if (!searchTermCopy) {
      return;
    }

    // make AJAX request to OMDBAPI to get list of results
    fetch(`https://www.omdbapi.com/?s=${searchTermCopy}&apikey=a9d858b2`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        // throw error if no movies are found
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }
        // store array of movie objects in component state if movies are found
        if (data.Response === 'True' && data.Search) {
          setResults(data.Search);
          setError('');
        }
      })
      .catch((error) => {
        // update error state if error is caught
        setError(error.message);
        console.log(error);
      });
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <form onSubmit={handleSubmit} className='form-inline my-4'>
            <input
              type='text'
              className='form-control mr-sm-2'
              placeholder='Frozen'
              value={searchTerm}
              onChange={handleChange}
            />
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
          {(() => {
            if (error) {
              // display error if one is thrown
              return error;
            }

            return results.map((movie) => {
              // display each individual movie from search
              return <Movie key={movie.imdbID} movie={movie} />;
            });
          })()}
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MovieFinder />);
