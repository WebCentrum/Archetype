using Archetype.Models;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;

namespace Archetype.Extensions
{
    public static class ArchetypePropertyModelExtensions
    {
        public static bool IsArchetype(this ArchetypePropertyModel prop)
        {
            return prop.PropertyEditorAlias.InvariantEquals(Constants.PropertyEditorAlias);
        }

        internal static PublishedPropertyType CreateDummyPropertyType(this ArchetypePropertyModel prop)
        {
            return (PublishedPropertyType)UmbracoContext.Current.Application.ApplicationCache.RequestCache.GetCacheItem("AT_" + prop.HostContentType?.Alias + "_" + prop.Alias, () =>
                new PublishedPropertyType(prop.HostContentType, new PropertyType(new DataTypeDefinition(-1, prop.PropertyEditorAlias) { Id = prop.DataTypeId })));
        }
    }
}