function AmexCardnumber(inputtxt) {
  let cardno = /^(?:3[47][0-9]{13})$/;
  return cardno.test(inputtxt);
}

function VisaCardnumber(inputtxt) {
  let cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  return cardno.test(inputtxt);
}

function MasterCardnumber(inputtxt) {
  let cardno = /^(?:5[1-5][0-9]{14})$/;
  return cardno.test(inputtxt);
}

function DiscoverCardnumber(inputtxt) {
  let cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  return cardno.test(inputtxt);
}

function DinerClubCardnumber(inputtxt) {
  let cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
  return cardno.test(inputtxt);
}

function JCBCardnumber(inputtxt) {
  let cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
  return cardno.test(inputtxt);
}

module.exports = function isValidCreditCardNumber(cardNumber) {
  cardNumber = cardNumber.trim();

  let card = {
    brand: null,
    number: '',
    error: false,
    status: false,
  };

  if (VisaCardnumber(cardNumber)) {
    card['brand'] = 'visa';
  } else if (MasterCardnumber(cardNumber)) {
    card['brand'] = 'mastercard';
  } else if (AmexCardnumber(cardNumber)) {
    card['brand'] = 'americanexpress';
  } else if (DiscoverCardnumber(cardNumber)) {
    card['brand'] = 'discover';
  } else if (DinerClubCardnumber(cardNumber)) {
    card['brand'] = 'dinerclub';
  } else if (JCBCardnumber(cardNumber)) {
    card['brand'] = 'jcb';
  } else {
    card['error'] = 'Invalid entry';
    card['number'] = cardNumber;

    return card;
  }

  card['number'] = cardNumber;
  card['status'] = true;

  return card;
};
