import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Switch,
    FlatList,
} from 'react-native';

import story_json from './story.json';

const stateExample = () => {

    const [imageList, setImageList] = useState(story_json);
    const [showOnlyLiked, setShowOnlyLiked] = useState(false);

    function onLikeChange(isLikeSelected) {
        setShowOnlyLiked(isLikeSelected);
        isLikeSelected
            ? setImageList(imageList.filter(image => image.liked))
            : setImageList(story_json);
    }

    const [dark, setDark] = useState(false);

    function changeTheme() {
        setDark(!dark);
    }

    const darkTheme = StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: dark ? '#15202b' : 'white',
        },
        head_text:
        {
            fontSize: 12,
            flex: 1,
            paddingTop: 10,
            padding: 5,
            color: dark ? 'white' : 'black',
        },
        user_name_text:
        {
            fontWeight: 'bold',
            fontSize: 18,
            color: dark ? 'white' : 'black',
        },
    });


    return (
        <View style={darkTheme.container}>
            <View style={styles.switch_area}>
                <View>
                    <Text style={darkTheme.head_text}>
                        Show all images
                    </Text>
                </View>
                <View >
                    <Switch value={showOnlyLiked} onValueChange={onLikeChange}
                        style={{ flex: 1 }} />
                </View>
                <View>
                    <Text style={darkTheme.head_text}>
                        Show images that i like
                    </Text>
                </View>
            </View>
            <View style={styles.switch_area}>
                <View>
                    <Text style={darkTheme.head_text}>
                        Light Mode
                    </Text>
                </View>
                <View >
                    <Switch value={dark} onValueChange={changeTheme}
                        style={{ flex: 1 }} />
                </View>
                <View>
                    <Text style={darkTheme.head_text}>
                        Dark Mode
                    </Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={imageList}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={{ paddingBottom: 300 }} />
                    }
                    renderItem={({ item }) => (
                        <View style={styles.photo_area}>
                            <Text style={darkTheme.user_name_text}>
                                {item.userName}
                            </Text>
                            <Image source={{ uri: item.imageUrl }} style={styles.images} />
                        </View>
                    )
                    }
                />
            </View>
        </View>
    );
};

const PhotoArea = ({ items }) => {
    return (
        <View style={styles.photo_area}>
            <Text style={darkTheme.user_name_text}>
                {items.userName}
            </Text>
            <Image source={{ uri: items.imageUrl }} style={styles.images} />
        </View>
    );
};

const styles = StyleSheet.create(
    {
        switch_area:
        {
            flexDirection: 'row',
            width: '100%',
            height: 50,
        },
        photo_area:
        {
            padding: 5,
            width: '100%',
        },
        images:
        {
            width: '100%',
            height: 250,
            marginBottom:20,
            borderRadius:25,
        }
    }
);

export default stateExample;