'use strict';
$.ajax( '../data/page-1.json' )
  .then ( data=>{
    console.log( data );
    data.forEach( value => {
      let newHorns=new Horns( value );
      newHorns.render();
    } );
    populateSelectBox();
    $( '#photo-template' ).first().remove();
  } );



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
 


  let dataClone=$( '#photo-template' ).clone();
  dataClone.addClass( this.keyword );

  dataClone.find( 'h2' ).text( this.title );
  dataClone.find( 'img' ).attr( 'src', this.image_url );
  dataClone.find( 'p' ).text( this.description );
  $( 'main' ).append( dataClone );
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

  console.log( seen );
}

$( 'select' ).on( 'change', function() {
  let selected = $( this ).val();
  $( 'div' ).hide();
  $( `.${selected}` ).fadeIn( 800 );
} );





