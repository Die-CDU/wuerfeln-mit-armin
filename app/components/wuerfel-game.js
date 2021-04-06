import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WuerfelGameComponent extends Component {
  @tracked dice1;
  @tracked dice2;
  @tracked dice3;
  @tracked dice4;
  @tracked dice5;
  @tracked dice6;
  @tracked dice7;
  @tracked dice8;
  @tracked dice9;

  get text1() {
    const TEXTS1 = ['ein-', 'zwei-', 'drei-', 'vier-', 'fünf-', 'sechs-'];
    return TEXTS1[this.dice1 - 1];
  }

  get text2() {
    const TEXTS2 = [
      'tägige/n',
      'wöchige/n',
      'monatige/n',
      'fache/n',
      'malige/n',
      'hebige/n',
    ];
    return TEXTS2[this.dice2 - 1];
  }

  get text3() {
    const TEXTS3 = [
      'harte/n',
      'softe/n',
      'optionale/n',
      'intransparente/n',
      'alternativlose/n',
      'unumkehrbare/n',
    ];
    return TEXTS3[this.dice3 - 1];
  }

  get text4() {
    const TEXTS4 = [
      'Wellenbrecher-',
      'Brücken-',
      'Treppen-',
      'Wende-',
      'Impf-',
      'Ehren-',
    ];
    return TEXTS4[this.dice4 - 1];
  }

  get text5() {
    const TEXTS5 = [
      'Lockdown',
      'Stopp',
      'Maßnahme',
      'Kampagne',
      'Sprint',
      'Matrix',
    ];
    return TEXTS5[this.dice5 - 1];
  }

  get text6() {
    const TEXTS6 = [
      'zum Sommer',
      'auf Weiteres',
      'zur Bundestagswahl',
      '2030',
      'nach den Abiturprüfungen',
      'in die Puppen',
    ];
    return TEXTS6[this.dice6 - 1];
  }

  get text7() {
    const TEXTS7 = [
      'soforting',
      'nachhaltigen',
      'allmählichen',
      'unausweichlichen',
      'wirtschaftsschonenden',
      'willkürlichen',
    ];
    return TEXTS7[this.dice7 - 1];
  }

  get text8() {
    const TEXTS8 = [
      'Senkung',
      'Steigerung',
      'Beendigung',
      'Halbierung',
      'Vernichtung',
      'Beschönigung',
    ];
    return TEXTS8[this.dice8 - 1];
  }

  get text9() {
    const TEXTS9 = [
      'Infektionszahlen.',
      'privaten Treffen.',
      'Wirtschaftsleistung.',
      'Wahlprognosen.',
      'dritten Welle.',
      'Bundeskanzlerin.',
    ];
    return TEXTS9[this.dice9 - 1];
  }

  constructor() {
    super(...arguments);
    this.rerollAll();
  }

  @action reroll(index) {
    console.log('rerol', index);
    this['dice' + index] = this._randomNumber();
  }

  rerollAll() {
    this.reroll(1);
    this.reroll(2);
    this.reroll(3);
    this.reroll(4);
    this.reroll(5);
    this.reroll(6);
    this.reroll(7);
    this.reroll(8);
    this.reroll(9);
  }

  _randomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
