import React from 'react';
import './App.css';
import Sketch from 'react-p5'
import 'p5/lib/addons/p5.sound'

class Cenario extends React.Component {
  constructor(imagem, velocidade, p5) {
    super()
    this.imagem = imagem
    this.velocidade = velocidade
    this.x1 = 0
    this.x2 = p5.width
  }

  exibe = p5 => {
    p5.image(this.imagem, this.x1, 0, window.innerWidth, window.innerHeight)
    p5.image(this.imagem, this.x2, 0, window.innerWidth, window.innerHeight)
  }
  move = () => {
    this.x1 -= this.velocidade
    this.x2 -= this.velocidade

    if (this.x1 < -window.innerWidth) {
      this.x1 = window.innerWidth
    }
    if (this.x2 < -window.innerWidth) {
      this.x2 = window.innerWidth
    }
  }
}

class Personagem extends React.Component {
  constructor(imagem) {
    super()
    this.imagem = imagem
    this.matriz = [
      [0, 0],
      [200, 0], 
      [400, 0], 
      [600, 0], 
      [800, 0],
      [0, 200], 
      [200, 200], 
      [400, 200], 
      [600, 200], 
      [800, 200]
    ]
    this.frame = 0
  }

  exibe = p5 => {
    p5.image(this.imagem, 0, p5.height - 150, 150, 150,
      this.matriz[this.frame][0],this.matriz[this.frame][1],
      200, 200)
  }
  anima = () => {
    this.frame += 1
    if (this.frame > this.matriz.length - 1) {
      this.frame = 0
    }
  }
}

class App extends React.Component {
  eixoX = window.innerWidth
  eixoY = window.innerHeight
  fundo;
  fundo2;
  imagemPersonagem
  som;

  preload = async p5 => {
    this.fundo = p5.loadImage('https://i.imgur.com/1lSwR3h.png');

    this.fundo2 = p5.loadImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cb4d6bd2-8886-49d7-a287-54ce3e719298/d9nxb51-15279a4e-0024-4c57-a5e9-d1f2578c2bbf.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvY2I0ZDZiZDItODg4Ni00OWQ3LWEyODctNTRjZTNlNzE5Mjk4XC9kOW54YjUxLTE1Mjc5YTRlLTAwMjQtNGM1Ny1hNWU5LWQxZjI1NzhjMmJiZi5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.-GG_hxMoyhJq_oEXOmIUHRIzS-2kV7tJ64j3YbJ6XWQ');

    this.imagemPersonagem = p5.loadImage('https://producaodejogos.com/wp-content/uploads/2018/05/sprites_megaman_-running-1024x410.png');
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.eixoX, this.eixoY).parent(canvasParentRef)
    this.cenario = new Cenario(this.fundo, 3, p5)
    this.personagem = new Personagem(this.imagemPersonagem)
    p5.frameRate(12)
  }

  draw = p5 => {
    this.cenario.exibe(p5)
    this.cenario.move()
    this.personagem.exibe(p5)
    this.personagem.anima()

  }

  render() {
    return (
      <div>
        <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default App;