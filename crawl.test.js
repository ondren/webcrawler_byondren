const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
const{expect, test} = require('@jest/globals');


test("normalizeURL strip protocol", ()=>{
    const input = "https://website.com/path";
    const actual = normalizeURL(input);
    const expected = "website.com/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL trailing slashes", ()=>{
    const input = "https://website.com/path/";
    const actual = normalizeURL(input);
    const expected = "website.com/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL capitals", ()=>{
    const input = "https://WEBsite.com/path";
    const actual = normalizeURL(input);
    const expected = "website.com/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL strip http", ()=>{
    const input = "http://website.com/path";
    const actual = normalizeURL(input);
    const expected = "website.com/path";
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", ()=>{
    const inputHTMLBpdy = `
    <html>
        <body>
            <a href="https://website.com/path/">
                Website
            </a>
        
        </body>
    </html>
    `
    const inputBaseURL = "https://website.com/path/";
    const actual = getURLsFromHTML(inputHTMLBpdy, inputBaseURL);
    const expected = ["https://website.com/path/"];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", ()=>{
    const inputHTMLBpdy = `
    <html>
        <body>
            <a href="/path/">
                Website
            </a>
        
        </body>
    </html>
    `
    const inputBaseURL = "https://website.com";
    const actual = getURLsFromHTML(inputHTMLBpdy, inputBaseURL);
    const expected = ["https://website.com/path/"];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", ()=>{
    const inputHTMLBpdy = `
    <html>
        <body>
            <a href="https://website.com/path1/">
                Website path 1
            </a>
            <a href="/path2/">
                Website path 2
            </a>
        
        </body>
    </html>
    `
    const inputBaseURL = "https://website.com";
    const actual = getURLsFromHTML(inputHTMLBpdy, inputBaseURL);
    const expected = ["https://website.com/path1/", "https://website.com/path2/"];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", ()=>{
    const inputHTMLBpdy = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        
        </body>
    </html>
    `
    const inputBaseURL = "https://website.com";
    const actual = getURLsFromHTML(inputHTMLBpdy, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});