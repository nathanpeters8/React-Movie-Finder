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
}

// MovieFinder component includes the basic HTML and event listeners
class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle any changes to input and update state
  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // handle submitting the movie search input
  handleSubmit(event) {
    event.preventDefault();

    // get search term after form submitted
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim();
    // check if value isn't empty string
    if(!searchTerm) {
      return;
    }

    // make AJAX request to OMDBAPI to get list of results
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=a9d858b2`)
    .then((response) => {
      // check if response is ok or else throw error
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then((data) => {
      console.log(data);
      // throw error if no movies are found
      if(data.Response === 'False') {
        throw new Error(data.Error);
      }
      // store array of movie objects in component state if movies are found
      if(data.Response === 'True' && data.Search) {
        this.setState({ results: data.Search });
      }
    }).catch((error) => {
      // update error state if error is caught
      this.setState({ error: error.message });
      console.log(error);

      
    })
  }
  
  render() {
    const { searchTerm, results, error } = this.state;
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <form onSubmit={this.handleSubmit} className='form-inline my-4'>
              <input
                type='text'
                className='form-control mr-sm-2'
                placeholder='Frozen'
                value={searchTerm}
                onChange={this.handleChange}
              />
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
            {
              (() => {
                if(error) {
                  return error;
                }
                
                return results.map((movie) => {
                  return <Movie key={movie.imdbID} movie={movie}/>
                })
              })()
            }
          </div>
        </div>
      </div>
    );
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MovieFinder />);
