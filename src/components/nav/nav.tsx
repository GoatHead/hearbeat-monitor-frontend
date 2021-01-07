import * as React from 'react';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import * as _ from 'lodash'
import {useEffect, useState} from "react";

const navLinkGroups: INavLinkGroup[] = [
    {
        links: [
            {
                key: '#',
                name: '메인',
                icon: 'ViewDashboard',
                url: '#',
            },
            {
                key: '#/services',
                name: '서비스',
                icon: 'Server',
                url: '#/services'
            },
            {
                key: '#/hooks',
                name: '웹훅',
                icon: 'Send',
                url: '#/hooks'
            },
            {
                key: '#/heartbeat-test',
                name: '하트비트 테스트',
                icon: 'HeartFill',
                url: '#/heartbeat-test'
            }
        ]
    },
];

const keyList: (string | undefined)[] = _.map(navLinkGroups[0].links, 'key')

export const AppNav: React.FunctionComponent = () => {
    const [selectedKey, setSelectedKey] = useState('#')

    useEffect(() => {
        if (window.location.hash) {
            if (_.includes(keyList, window.location.hash)) {
                setSelectedKey(window.location.hash)
            } else {
                window.location.hash = '#'
            }
        }
    })

    return (
        <Nav
            className="sidebar"
            onLinkClick={_onLinkClick}
            selectedKey={selectedKey}
            ariaLabel="Nav"
            groups={navLinkGroups}
        />
    );

    function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
        if (item) {
            let key: string | undefined = item.key
            if (typeof key === 'undefined') {
                key = '#'
            }
            setSelectedKey(key)
        }
    }
};