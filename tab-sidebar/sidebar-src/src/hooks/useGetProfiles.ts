import { useEffect, useState } from 'react';


export type Profile = browser.contextualIdentities.ContextualIdentity & { id: string };

export const useGetProfiles = () => {
  const [ profiles, setProfiles ] = useState<Profile[]>([]);

  useEffect(() => {

    if (typeof browser === 'undefined') return;

    browser.contextualIdentities.query({})
      .then((identities) => {
        setProfiles(identities.map(identity => ({ ...identity, id: identity.name })));
      })
      .catch(() => console.error('could not fetch'));
  }, []);

  return {
    profiles,
    setProfiles
  };

};
