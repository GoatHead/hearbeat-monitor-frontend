import * as React from 'react';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import * as _ from 'lodash'
import {useEffect, useState} from "react";

type NavProps = {
    key: string
}

const navStyles: Partial<INavStyles> = {
    root: {
        width: 208,
        height: '100vh',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
    },
};

const navLinkGroups: INavLinkGroup[] = [
    {
        links: [
            {
                key: '#',
                name: 'Files',
                url: '#',
                linkProps: {
                    ['data-foo']: 'bar'
                }
            },
            {
                key: '#/recent',
                name: 'Recent',
                url: '#/recent'
            },
            {
                key: '#/photos',
                name: 'Photos',
                url: '#/photos'
            },
            {
                key: '#/shared',
                name: 'Shared',
                url: '#/shared'
            },
            {
                key: '#/recyclebin',
                name: 'Recycle bin',
                url: '#/recyclebin'
            }
        ]
    },
];

const keyList: (string | undefined)[] = _.map(navLinkGroups[0].links, 'key')

export const AppNav: React.FunctionComponent<NavProps> = () => {
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
            onLinkClick={_onLinkClick}
            selectedKey={selectedKey}
            ariaLabel="Nav"
            styles={navStyles}
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