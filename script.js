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
