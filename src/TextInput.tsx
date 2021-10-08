import * as React from 'react';

type Props = {
    
}

type keyResult = {
    key_result: string
}

type OKR = {
    objective: string,
    key_results: Array<keyResult>
}

type State = {
    text_input: string | undefined
    okrs: Array<OKR> | undefined
}

class TextInput extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const state: State = this.state = {
            text_input: undefined,
            okrs: undefined

        }
    }

    handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
    
        this.setState({
            [name]: value
        } as any, () => {
            this.setState({
                text_input: value
            })
        });
    }
    
    parseTextArray = (text_array: Array<string>) => {
        let classified_array: Array<any> = []
        
        text_array.forEach(line => {
            // determine if O, KR, or invalid
            if (line.slice(0,3) === "O: ") {
                console.log({
                    objective: line.slice(3)
                })

                classified_array.push({
                    objective: line
                })

            } else if (line.slice(0,4) === "KR: ") {
                console.log({
                    key_result: line.slice(4)
                })

                classified_array.push({
                    key_result: line 
                })
            } else {
                console.log("bad input")
                classified_array.push({
                    error: line
                })
            }
        })
        //console.log("classified_array: %o", classified_array)

        return classified_array
    }

    parseClassifiedArray = (text_array: Array<string>) => {

        let classified_array: Array<Object> = this.parseTextArray(text_array)
        console.log("classified_array: %o", classified_array)

        if (classified_array) {
            let first_objective: Object | undefined = classified_array.find(element => element.hasOwnProperty("objective"));
            console.log("First objective found was: %o", first_objective)
            if (first_objective) {
                let first_objective_index: number = classified_array.indexOf(first_objective)
                console.log("Index of first objective was: %o", first_objective_index)

                classified_array.splice(first_objective_index, 1)
                console.log("updated classified array: %o", classified_array)
            }
            
        

        }
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        if (this.state.text_input) {
            let input: string = this.state.text_input
            console.log("Input: %o", input)

            let parsed_text_array: Array<string> = input.split("\n");
            console.log("Parsed text: %o", parsed_text_array)

            this.parseClassifiedArray(parsed_text_array);
        }
    }

    render () {
        return (
            <div>
                <div>
                    <label>Paste your OKRs below:</label>
                </div>
                <div>
                    <textarea
                        value = {this.state.text_input}
                        onChange = {this.handleChange}
                    />
                </div>
                <div>
                    <button
                        onClick = {this.handleSubmit.bind(this)}
                    >Process OKRs</button>
                </div>
            </div>
        )
    }   
}

export default TextInput