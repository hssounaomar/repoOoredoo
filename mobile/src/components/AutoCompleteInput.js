import React, { Component } from 'react'
import classnames from 'classnames';

export class AutoCompleteInput extends Component {

    state = {
        suggestions: [],
        typedText: '',
        shakes: '',
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }



    getReference = (type) => {
        switch (type) {
            case 'parents':
                return ['reference', 'brand', 'model', 'site']
            case 'brand':
                return ['brand']
            case 'model':
                return ['model', 'brand']
            case 'site':
                return ['name', 'type']
            default:
                return ['name']
        }
    }


    getSuggestions = (data) => {

        const refs = this.getReference(this.props.name);
        let matchedValues = [];
        console.log(refs)
        const suggestions = data.filter(item => {
            let matchs = false;
            if (this.state.typedText !== "") {
                for (const ref of refs) {

                    if (item.hasOwnProperty(ref)) {
                        console.log('has a ref')
                        if (item[ref] instanceof Object) {
                            console.log('object type detected')
                            if (item[ref].name.toLowerCase().includes(this.state.typedText.toLowerCase())) {
                                if (!this.props.list && !this.props.multiple) {
                                    console.log('not a list')
                                    if (matchedValues.every(val => val !== item[ref])) {
                                        matchedValues.push(item[ref].name);
                                        matchs = true;
                                        console.log('typed text matchs')
                                    }
                                } else {
                                    console.log('gotcha')
                                    matchs = true;
                                    console.log('typed text matchs')
                                }
                            }
                        } else {
                            console.log('not an object')
                            if (item[ref].toLowerCase().includes(this.state.typedText.toLowerCase())) {
                                if (!this.props.list && !this.props.multiple) {
                                    if (matchedValues.every(val => item[ref] !== val)) {
                                        matchedValues.push(item[ref]);
                                        matchs = true;
                                        console.log('typed text matchs')
                                    }
                                } else {
                                    matchs = true;
                                    console.log('typed text matchs')
                                }
                            }
                        }
                    }
                    console.log(matchedValues)
                }
            }
            return matchs;
        })
        return suggestions;
    }

    nonExistent = (id) => this.props.tags.every(tag => tag !== id);

    selectSuggestion = (suggestion) => {
        if (this.props.list) {
            this.setState({ typedText: suggestion._id, suggestions: [] }, () => {
                this.props.handleChange(
                    {
                        target: {
                            name: this.props.name,
                            value: suggestion._id
                        },
                    }
                )
            })
        } else if (this.props.multiple) {
            if (this.nonExistent(suggestion._id)) {
                this.setState({ typedText: '', suggestions: [] }, () => {
                    this.props.handleTags(suggestion._id, 'add');
                })
            } else {
                this.setState({ shakes: suggestion._id }, () => {
                    setTimeout(() => { this.setState({ shakes: '' }) }, 240)
                })
            }
        } else {
            this.setState({ typedText: suggestion[this.props.name], suggestions: [] }, () => {
                this.props.handleChange(
                    {
                        target: {
                            name: this.props.name,
                            value: suggestion[this.props.name]
                        },
                    }
                )
                this.setState({ placeholder: '' })
            })
        }

    }

    handleChange = (e) => {
        console.log('change detected');
        const val = e.target.value
        this.setState({ typedText: e.target.value }, () => {
            this.setState({ suggestions: [...this.getSuggestions(this.props.data)] });

            this.props.handleChange && this.props.handleChange(
                {
                    target: {
                        name: this.props.name,
                        value: val
                    },
                }
            )
        })
    }

    handleClick = (e) => {
        if (!this.suggestions.contains(e.target)) {
            this.setState({ suggestions: [] })
        }
    }

    getItem = (id) => this.props.data.find(item => item._id === id)

    /*     getItemProperty = (id) => this.props.data.find(item => item[this.props.name]._id === id)
     */

    render() {
       
        return (
            <div ref={node => this.suggestions = node} className="tags-field form-control">
                {this.props.tags !== undefined &&
                    /* this.props.tags.length !== 0 && */
                    <div className="tags">
                        {this.props.tags.map((tag) =>
                            <span key={tag} className={classnames('tag', { shakes: this.state.shakes === tag })}>{this.getItem(tag).reference}
                                <button className="close-btn" onClick={() => this.props.handleTags(tag, 'delete')}>&times;</button>
                            </span>
                        )}
                    </div>
                }

                <input
                    onChange={this.handleChange}
                    autoComplete="off"
                    type="text"
                    name={this.props.name}
                    placeholder={
                        this.props.tags !== undefined && this.props.tags.length !== 0
                        ?
                        ''
                        :
                        this.props.placeholder
                    }
                    className="tags-input"
                    value={
                        this.props.value
                            ?
                            this.props.value
                            :
                            this.state.typedText
                    }
                />

                {this.state.suggestions.length !== 0 &&
                    <div tabIndex="0" className="suggestions card" >
                        {this.state.suggestions.map(suggestion =>
                            <div key={suggestion._id} className="suggestions-item" onClick={() => this.selectSuggestion(suggestion)} >
                                {this.getReference(this.props.name).slice(0, 1).map((key, index) =>
                                    suggestion[key] instanceof Object
                                        ?
                                        <span key={index} className="suggestion-title"> {suggestion[key].name} </span>
                                        :
                                        <span key={index} className="suggestion-title"> {suggestion[key]} </span>
                                )}
                                {this.getReference(this.props.name).slice(1, 2).map((key, index) =>
                                    suggestion[key] instanceof Object
                                        ?
                                        <span key={index} className="suggestion-description">{suggestion[key].name} </span>
                                        :
                                        <span key={index} className="suggestion-description"> {suggestion[key]} </span>
                                )}
                            </div>
                        )}
                    </div>
                }

            </div>
        )
    }
}

export default AutoCompleteInput;