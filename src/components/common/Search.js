import React from 'react';
import { handleResponse } from '../../helpers.js';
import Loading from '../common/Loading';
import Table from '../list/Table';
import { API_URL } from '../../config';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      searchName: '',
      searchCity: '',
      searchTown: '',
      loading: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state);
  }

  handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    this.setState({ [inputName]: inputValue });

    const { searchName, searchCity, searchTown } = this.state

    // If searchQuery isn't present, don't send request to server
    if (!(searchName || searchCity || searchTown )) {
      return false;
    }

    console.log(`${API_URL}/search?name=${searchName}&city=${searchCity}&town=${searchTown}`);
    // Set loading to true, while we are fetching data from server
    this.setState({ loading: true });

    fetch(`${API_URL}/search?name=${searchName}&city=${searchCity}&town=${searchTown}`)
      .then(handleResponse)
      .then((result) => {
        this.setState({
          searchResults: result,
          loading: false,
        });
      });
  }

  renderSearchResults() {
    const { searchResults, searchName, searchCity, searchTown, loading } = this.state;

    if (!(searchName || searchCity || searchTown )) {
      return '';
    }

    if (searchResults.length > 0) {
      return (
        <Table vets={searchResults} />
      )
    }

    // Send no result, only if loading is set to false
    // To avoid showing no result, when actually there are ones
    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">
            No results found.
          </div>
        </div>
      )
    }
  }

  render() {
    const { searchName, searchCity, searchTown, loading } = this.state;

    return (
      <div className='Search'>
        <form onSubmit={this.handeSubmit}>
            <input
                type="text"
                name="searchName"
                className="Search-input"
                placeholder="İsim"
                value={searchName}
                onChange={this.handleChange}
            />
            <input
                type="text"
                name="searchCity"
                className="Search-input"
                placeholder="İl"
                value={searchCity}
                onChange={this.handleChange}
            />
            <input
                type="text"
                name="searchTown"
                className="Search-input"
                placeholder="İlçe"
                value={searchTown}
                onChange={this.handleChange}
            />
            <button>Submit</button>
        </form>
        <div>
          <span className="Search-icon" />

          {loading &&
            <div className="Search-loading">
              <Loading
                width="12px"
                height="12px"
              />
            </div>}
        </div>

        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
