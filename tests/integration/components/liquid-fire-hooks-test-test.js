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
            didAnimate(){
               this.set('onDidAnimate', true);
            },
            didAnimateOut (){
              this.set('onDidAnimateOut', true);
            },
            didAnimateIn() {
              this.set('onDidAnimateIn', true);         
            },
            fooOnDidAnimate: Ember.on('didAnimateIn', function() {
              this.set('fooDidAnimateInEvent', true);
            }),
            willAnimate() {
              this.set('onWillAnimate', true);
            },
            willAnimateIn(){
               this.set('onWillAnimateIn', true);
            },
            willAnimateOut(){
               this.set('onWillAnimateOut', true);
            }

        })
    );
    this.set( 'visible', false );

    this.set('onDidAnimateIn', false);
    this.set('onWillAnimate', false);
    this.set('fooDidAnimateInEvent', false);
    this.set('onWillAnimateIn', false);
    this.set('onWillAnimateOut', false);
    this.set('onDidAnimateOut', false);
    this.set('onDidAnimate', false);
    
    this.render(hbs `
    {{#liquid-if visible class='mock'}}
      {{mock-component onDidAnimateIn=onDidAnimateIn  onWillAnimate=onWillAnimate fooDidAnimateInEvent=fooDidAnimateInEvent onWillAnimateIn=onWillAnimateIn onWillAnimateOut=onWillAnimateOut onDidAnimateOut=onDidAnimateOut onDidAnimate=onDidAnimate}}
    {{/liquid-if}}
    `);

    this.set('visible', true );   
    assert.ok(this.get('onWillAnimate'), 'onWillAnimate');

    var context = this;
    Ember.run.later(function () {
      assert.ok(context.get('onDidAnimateIn'), 'onDidAnimateIn');
      assert.ok(context.get('fooDidAnimateInEvent'), 'fooDidAnimateInEvent');
      assert.ok(context.get('onWillAnimateIn'), 'willAnimateIn');
      assert.ok(context.get('onDidAnimate'), 'didAnimate');
      context.set('visible', false );        
      Ember.run.later(function (){
        assert.ok(context.get('onWillAnimateOut'), 'willAnimateOut');
        assert.ok(context.get('onDidAnimateOut'), 'didAnimateOut');
        done();      
      }, 2000);
    }, 3000);

    return tmap.waitUntilIdle();
});
