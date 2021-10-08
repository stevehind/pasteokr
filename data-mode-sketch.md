# Paste OKR data model sketch

##  Input: a string with linebreaks
* Each line should represent a new "O" or "KR"
* Each line should begin with "O" or "KR"
* Lines that don't begin with "O" or "KR" are errors

## Output: an OKRs object
* An array of OKR-s
* An OKR is
```
{
    objective: some objective
    key_results: [
        result,
        result,
        result
    ]
}
```

## Transformation
1) Parse the string into an array of strings, by splitting on newlines (`"\n"`)
2) Iterate through the array and find the "O"s, i.e. items beginning with `"O: "`
3) Put the index of Os in the first array in a new array
4) Slice the first array into chunks, that start with an O and end before the next O
5) Process each chunk into the OKR object format


