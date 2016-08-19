import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

var tmap;

moduleForComponent('liquid-fire-hooks-test', 'Integration | Component | liquid fire hooks test', {
  integration: true,
  setup: function() {
    tmap = this.container.lookup('service:liquid-fire-transitions');
  }
});

test('it renders', function(assert) {
  var done = assert.async();
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    tmap.map(function() {
      this.transition(
        this.hasClass('mock'),
        this.use('with-hook', 'to-right', { duration: 200 }),
        this.reverse('with-hook', 'to-left', { duration: 200 })
      );
    });

    const mockTemplate = hbs`
        <span class="testAttrs">Hello</span>
    `;

    this.registry.register( 'template:mock-template', mockTemplate );

    this.registry.register( 'component:mock-component',
        Ember.Component.extend({
            layoutName: 'mock-template',

            didAnimateIn() {
              console.log('Did animate in');
            },
            didInsertElement () {
              console.log('didInsert');
            },
            // // use it 'event-style'
            onDidAnimate: Ember.on('didAnimateIn', function() {
              console.log('Did animate in event');
            }),
            willAnimate() {
              console.log('will animate');
            }
        })
    );
    this.set( 'visible', false );
    this.render(hbs `
    {{#liquid-if visible class='mock'}}
      {{mock-component}}
    {{/liquid-if}}
    `);
    var context = this;
    setTimeout(function (){
      context.set('visible', true );   
      assert.equal(context.$().length, 1);
      done();
    }, 1000);

    return tmap.waitUntilIdle();
});
