import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from "./src/components/placeInput/PlaceInput";
import PlaceList from "./src/components/placeList/PlaceList";
import PlaceDetail from "./src/components/placeDetail/PlaceDetail";
import {addPlace, deletePlace, selectPlace, deselectPlace} from './src/store/actions/index';

class App extends React.Component {

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace();
    }

    modalClosedHandler = () => {
        this.props.onDeselectPlace();
    }

    placeSelectedHandler = index => {
        this.props.onSelectPlace(index);
    }

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail 
                    selectedPlace={this.props.selectedPlace} 
                    onItemDeleted={this.placeDeletedHandler} 
                    onModalClosed={this.modalClosedHandler}
                />
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
                <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    };
};

const mapDispatchToProps = dispath => {
    return {
        onAddPlace: (name) => dispath(addPlace(name)),
        onDeletePlace: () => dispath(deletePlace()),
        onSelectPlace: (key) =. dispath(selectedPlace(key)),
        onDeselectPlace: () => dispath(deletePlace())
    };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(App);
