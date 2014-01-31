chai = require 'chai'
sinon = require 'sinon'
chai.should()

root = global ? window

describe '<%= addOnName %>', ->

  it 'should throw an loadError when ShareCoffee is not loaded', ->
    (-> require('<%= addOnName %>')).should.throw ''

