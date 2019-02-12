import React, {Component} from 'react';
import axios from 'axios';

export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchIndexes();
    this.fetchValues();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({values: values.data});
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({seenIndexes: seenIndexes.data});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });

    this.setState({index: ''});
  }

  renderIndexes() {
    return this.state.seenIndexes.map(({number}) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index: </label>
          <input
            value={this.state.index}
            onChange={e => this.setState({index: e.target.value})}
            type="number" />
          <button>Submit</button>

          <h3>Indicies I have seen:</h3>
          {this.renderIndexes()}

          <h3>Calculated Values</h3>
          {this.renderValues()}
        </form>
      </div>
    );
  }
}
