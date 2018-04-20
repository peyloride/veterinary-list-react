import React from 'react';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers.js';
import Loading from '../common/Loading';
import Pagination from './Pagination';
import Table from './Table';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            vets: [],
            page: 1,
            error: null,
        }
        
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchVets();
    }

    fetchVets() {
        const { page } = this.state;
    
        this.setState({ loading: true });
    
        fetch(`${API_URL}/veterinaries?page=${page}`)
          .then(handleResponse)
          .then((data) => {    
            this.setState({
              vets: data,
              error: '',
              loading: false,
            });
          })
          .catch((error) => {
            this.setState({
              error: 'Bir hata meydana geldi.',
              loading: false,
            });
          });
    }

    handlePaginationClick(direction) {
        let nextPage = this.state.page;
    
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
    
        // Call fetchCurrencies function inside setState's callback
        // Because we have to make sure first page state is updated
        this.setState({ page: nextPage }, () => {
          this.fetchVets();
        });
    }

    render () {
        const { vets, page, loading, error } = this.state;


        if (loading) {
            return <Loading />
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table vets={vets} />

                <Pagination
                    page={page}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;