/**
 * PickerInput
 * https://github.com/markuswind/react-native-select-input
 */

'use strict';

var AppRegistry    = require('react-native').AppRegistry;
var PickerKeyboard = require('./PickerKeyboard.js');
var React          = require('react');
var StyleSheet     = require('react-native').StyleSheet;
var Text           = require('react-native').Text;
var View           = require('react-native').View;

var SelectInputIOS = React.createClass({
    getInitialState: function() {
        return {
            selectedValue: this.props.value || ''
        };
    },

    focus: function() {
        this.refs.pickerkeyboard.focus();
        this.props.onBeginEditing && this.props.onBeginEditing();
    },

    onSubmit: function(value) {
        this.setState({selectedValue: value}, function() {
            this.props.onEndEditing && this.props.onEndEditing();
        });
    },

    onCancel: function() {
        this.props.EndEditing && this.props.onEndEditing();
    },

    render: function() {
        return (
            <View>
                <Text onPress={this.focus} style={this.props.style || styles.default}>
                    {this.getValueLabel()}
                </Text>

                <PickerKeyboard
                    ref={'pickerkeyboard'}
                    color={this.props.color || 'blue'}
                    options={this.props.options || [{value: '', label: ''}]}
                    value={this.props.value}
                    onCancel={this.onCancel}
                    onSubmit={this.onSubmit}
                    buttonsBackgroundColor={this.props.buttonsBackgroundColor}
                    keyboardBackgroundColor={this.props.keyboardBackgroundColor}
                    returnKeyText={this.props.returnKeyText || 'Done'}
                    cancelKeyText={this.props.cancelKeyText || 'Cancel'}
                />
            </View>
        );
    },

    getValueLabel: function() {
        var label   = '';
        var options = this.props.options || [{value: '', label: ''}];

        for(var index = 0; index < options.length; index++) {
            if(options[index].value == this.props.value) {
                label = options[index].label;
                break;
            }
        }

        return label;
    }
});

var styles = StyleSheet.create({
    default: {
        height:      26,
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        flex:        1,
        fontSize:    13,
        padding:     4,
    },
});

module.exports = SelectInputIOS;
