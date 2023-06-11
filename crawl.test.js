const {normalizeURL} = require('./crawl.js');
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