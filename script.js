// MovieFinder React component
class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
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
      // log data if request successful
      console.log(data);
    }).catch((error) => {
      // log error if request failed
      console.log(error);
    })
  }
  
  render() {
    const { searchTerm, results } = this.state;
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
            {results.map((movie) => {
              return null; // returns nothing for now
            })}
          </div>
        </div>
      </div>
    );
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MovieFinder />);
