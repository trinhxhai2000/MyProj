using System.ComponentModel.DataAnnotations;

namespace MyProj.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}