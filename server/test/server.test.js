const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');

// Sets the database to empty for testing purpose.
beforeEach((done)=>{
  Todo.remove({}).then(() => {
    done()
  })
});

// Arranges test data back in a sensible way

describe('POST /todos', () => {
  it('should create a new todo', (done)=>{
    var text = "Todo a test!";

    // This is a post request to todos
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
        console.log(res.body.text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        // Uses the Todo find thing.
        // Not super necessary, right now, but adjusting the teachers method.
        Todo.find().then((todos)=> {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((error) => done(error));
      })
  })
  it('should not send an empty object', (done)=> {
    request(app)
      .post('/todos') // this is an Error
      .send({text: 'a thread'})
      .expect(400)
      .end((err, res) =>{
        if(err){
          return done(err)
        }
      })
  })
})
