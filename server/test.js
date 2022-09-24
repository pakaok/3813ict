var app = require('./server.js')
var chai = require('chai')
var chaihttp= require('chai-http')
var assert = require('assert')
chai.use(chaihttp)

describe('REST API test',()=>{
    it('Login',(done)=>{
        chai.request(app)
        .post('/login')
        .send({id:'super',pw:'superemail'})
        .end((err,res)=>{
            assert.deepEqual(res.body,{valid:true,id:'super',level:4})
            done()
        })
    }).timeout(100000)

    describe('Mongodb API',()=>{
        it('db recieve',(done)=>{
            chai.request(app)
            .get('/db/rq')
            .end((err,res)=>{
                assert.equal(res.status,200)
                done()
            })
        })

        it('Chat history recieve',(done)=>{
            chai.request(app)
            .post('/db/rq/history')
            .send({_id:'g1/1'})
            .end((err,res)=>{
              //  console.log(res.body)
                assert.equal(res.status,200)
                done()
            })
        })

        it('User image',(done)=>{
            chai.request(app)
            .get('/image/system.png')
            .end((err,res)=>{
                assert.equal(res.status,200)
                done()
            })
        })
    })

})