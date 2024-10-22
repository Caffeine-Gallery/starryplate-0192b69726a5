export const idlFactory = ({ IDL }) => {
  const GalleryImage = IDL.Record({
    'url' : IDL.Text,
    'description' : IDL.Text,
    'category' : IDL.Text,
  });
  const MenuItem = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'category' : IDL.Text,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'getAbout' : IDL.Func([], [IDL.Text], ['query']),
    'getGalleryImages' : IDL.Func([], [IDL.Vec(GalleryImage)], ['query']),
    'getMenu' : IDL.Func([], [IDL.Vec(MenuItem)], ['query']),
    'makeReservation' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
