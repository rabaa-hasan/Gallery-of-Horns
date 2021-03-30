'use strict';
let allHorn1=[];
let allHorn2=[];

$.ajax( './data/page-1.json' )
  .then ( data=>{
    console.log( data );
    data.forEach( value => {
      let newHorns=new Horns( value );
      allHorn1.push(newHorns);
      let renderHorn=newHorns.render();
      $('main').append(renderHorn);
    } );
   
  } );


  $.ajax( './data/page-2.json' )
  .then ( data=>{
    console.log( data );
    data.forEach( value => {
      let newHorns=new Horns( value );
      allHorn2.push(newHorns);
      let renderHorn=newHorns.render2();
      $('main').append(renderHorn);
    });
    page1Render();
  } );

$('.page1').on('click',page1Render)
$('.page2').on('click', page2Render)
console.log('.page1')


function Horns( data ){
  this.image_url = data.image_url;
  console.log( this.image_url );
  this.title=data.title;
  this.description=data.description;
  this.keyword=data.keyword;
  this.horns=data.horns;
  Horns.all.push(this);
}

Horns.all=[];

Horns.prototype.render = function() {
  
  let dataClone = $('#hornTemplate1').html();
  let dataSet = Mustache.render(dataClone,this);
  console.log(this);
  return dataSet;

  
  
};
Horns.prototype.render2 = function() {
  
  let dataClone = $('#hornTemplate2').html();
  let dataSet = Mustache.render(dataClone,this);
  return dataSet;
};


function populateSelectBox() {
  let seen = {};
  let select = $( 'select' );
  Horns.all.forEach( ( horn ) => {
    if ( ! seen[horn.keyword] ) {
      let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
      select.append( option );
      seen[horn.keyword] = true;
    }
  } );

}

$( 'select' ).on( 'change', function() {
  let selected = $( this ).val();
  $( 'div' ).hide();
  $( `.${selected}` ).fadeIn( 800 );
} );


function page1Render() {
  $('div').hide();
  $('.photo-template1').fadeIn(800);
  populateSelectBox(allHorn1);
}
function page2Render() {
  $('div').hide();
  $('.photo-template2').fadeIn(800);
  populateSelectBox(allHorn2);
}


